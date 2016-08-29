using DemoApp.Extensions;
using System;
using System.Linq.Expressions;
using System.Reflection;

namespace DemoApp.Datatables
{
    internal class ParameterReplacer : ExpressionVisitor
    {
        private readonly ParameterExpression _parameter;

        internal ParameterReplacer(ParameterExpression parameter)
        {
            _parameter = parameter;
        }

        protected override Expression VisitParameter(ParameterExpression node)
        {
            return base.VisitParameter(_parameter);
        }
    }

    public class QueryBuilder<T>
    {
        private Expression _binaryExpression;
        private ParameterExpression _parameterExpression;


        public QueryBuilder()
        {
            _binaryExpression = null;
        }

        public string FirstLetterToUpper(string str)
        {
            if (str == null)
                return null;

            if (str.Length > 1)
                return char.ToUpper(str[0]) + str.Substring(1);

            return str.ToUpper();
        }

        public static QueryableInfo ConvertToQueryableInfo(string property)
        {
            var props = property.Split('.');
            var type = typeof(T);
            var arg = Expression.Parameter(type, "x");

            Expression expr = arg;
            foreach (var prop in props)
            {
                var pi = type.GetProperty(prop.FirstLetterToUpper());
                expr = Expression.Property(expr, pi);
                type = pi.PropertyType;
            }
            return new QueryableInfo
            {
                ParameterExpression = arg,
                Type = type,
                Expression = expr
            };
        }

        public QueryBuilder<T> And(string propertyName, QueryableExtensions.QueryType operation, object value)
        {
            var constantValue = Expression.Constant(value);
            var queryableInfo = ConvertToQueryableInfo(propertyName);

            var method = constantValue.Type.GetMethod(Enum.GetName(typeof(QueryableExtensions.QueryType), operation),
                new[] {queryableInfo.Type});

            int n;
            var res = int.TryParse(value.ToString(), out n);
            Expression call;

            if (queryableInfo.Type == typeof(int) && res)
            {
                call = Expression.Equal(queryableInfo.Expression, Expression.Constant(n));
            }
            else
            {
                if (method == null) return this;
                call = Expression.Call(queryableInfo.Expression, method, constantValue);
            }

            if (_binaryExpression == null)
            {
                _binaryExpression = call;
                _parameterExpression = queryableInfo.ParameterExpression;
            }
            else
            {
                _binaryExpression = Expression.AndAlso(_binaryExpression, call);
            }

            return this;
        }

        public QueryBuilder<T> Or(string propertyName, QueryableExtensions.QueryType operation, object value)
        {
            var constantValue = Expression.Constant(value);
            var queryableInfo = ConvertToQueryableInfo(propertyName);

            var method = constantValue.Type.GetMethod(Enum.GetName(typeof(QueryableExtensions.QueryType), operation),
                new[] {queryableInfo.Type});

            int n;
            var res = int.TryParse(value.ToString(), out n);
            Expression call;

            if (queryableInfo.Type == typeof(int) && res)
            {
                call = Expression.Equal(queryableInfo.Expression, Expression.Constant(n));
            }
            else
            {
                if (method == null) return this;
                call = Expression.Call(queryableInfo.Expression, method, constantValue);
            }

            if (_binaryExpression == null)
            {
                _binaryExpression = call;
                _parameterExpression = queryableInfo.ParameterExpression;
            }
            else
            {
                _binaryExpression = Expression.OrElse(_binaryExpression, call);
            }

            return this;
        }

        public Expression<Func<T, bool>> Build()
        {
            var body = new ParameterReplacer(_parameterExpression).Visit(_binaryExpression);
            return body == null ? null : Expression.Lambda<Func<T, bool>>(body, _parameterExpression);
        }
    }
}