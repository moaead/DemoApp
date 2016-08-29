using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using DemoApp.Datatables;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace DemoApp.Extensions
{
    public class QueryableInfo
    {
        public ParameterExpression ParameterExpression { get; set; }
        public Type Type { get; set; }
        public Expression Expression { get; set; }
    }

    public static class QueryableExtensions
    {
        public enum QueryType
        {
            Equals,
            StartsWith,
            EndsWith,
            Contains
        }

        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder(source, property, "OrderBy");
        }

        public static IOrderedQueryable<T> Where<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder(source, property, "Where");
        }

        public static IOrderedQueryable<T> OrderByDescending<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder(source, property, "OrderByDescending");
        }

        public static IOrderedQueryable<T> ThenBy<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder(source, property, "ThenBy");
        }

        public static IOrderedQueryable<T> ThenByDescending<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder(source, property, "ThenByDescending");
        }

        public static DataTableResponse ApplyDatatables<T>(this IQueryable<T> query, DatatableRequest datatableRequest)
            where T : class
        {
            var filteredQuery =
                DatatablesHelper.ApplyGlobalFilter(
                    DatatablesHelper.ApplyColumnFilters(
                        DatatablesHelper.ApplyGlobalFilter(query, datatableRequest.Columns, datatableRequest.Search),
                        datatableRequest.Columns), datatableRequest.Columns, datatableRequest.Search);

            return new DataTableResponse
            {
                Data =
                    DatatablesHelper.ApplyOrders(filteredQuery, datatableRequest.Order, datatableRequest.Columns)
                        .Skip(datatableRequest.Start)
                        .Take(datatableRequest.Length)
                        .ToList(),
                Draw = datatableRequest.Draw,
                RecordsFiltered = filteredQuery.Count(),
                RecordsTotal = query.Count()
            };
        }

        private static IOrderedQueryable<T> ApplyOrder<T>(IQueryable<T> source, string property, string methodName)
        {
            var queryableInfo = QueryBuilder<T>.ConvertToQueryableInfo(property);

            var delegateType = typeof(Func<,>).MakeGenericType(typeof(T), queryableInfo.Type);
            var lambda = Expression.Lambda(delegateType, queryableInfo.Expression, queryableInfo.ParameterExpression);
            var result = typeof(Queryable).GetMethods().Single(
                    method => (method.Name == methodName)
                              && method.IsGenericMethodDefinition
                              && (method.GetGenericArguments().Length == 2)
                              && (method.GetParameters().Length == 2))
                .MakeGenericMethod(typeof(T), queryableInfo.Type)
                .Invoke(null, new object[] {source, lambda});
            return (IOrderedQueryable<T>) result;
        }

        public static List<SelectListItem> GenerateDropDown<T>(this IQueryable<T> source, Func<T, object> selectFunc)
        {
            return source.Select(selectFunc).Where(t => t != null).Distinct().Select(t => new SelectListItem
            {
                Value = t.ToString(),
                Text = t.ToString()
            }).ToList();
        }
    }
}