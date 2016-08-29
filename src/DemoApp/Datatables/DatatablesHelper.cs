using System.Linq;
using DemoApp.Extensions;

namespace DemoApp.Datatables
{
    public class DatatablesHelper
    {
        public static IOrderedQueryable<T> ApplyOrders<T>(IQueryable<T> db, DatatableRequestOrder[] orders,
            DatatbleRequestColumn[] columns) where T : class
        {
            var columnName = columns[orders[0].Column].Data;
            var res = orders[0].Dir == DatatbleRequestDir.Asc
                ? db.OrderBy(columnName)
                : db.OrderByDescending(columnName);
            foreach (var order in orders.Skip(1))
                res = order.Dir == DatatbleRequestDir.Asc
                    ? db.OrderBy(columnName)
                    : db.OrderByDescending(columnName);
            return res;
        }

        public static IQueryable<T> ApplyColumnFilters<T>(IQueryable<T> query, DatatbleRequestColumn[] columns)
            where T : class
        {
            if ((columns == null) || (columns.Length == 0)) return query;
            var searchQuery = new QueryBuilder<T>();

            foreach (var column in columns)
                if (column.Searchable && !string.IsNullOrEmpty(column.Search?.Value))
                    searchQuery.And(column.Data, QueryableExtensions.QueryType.Contains, column.Search.Value);
            var build = searchQuery.Build();
            if (build != null)
                query = query.Where(build);
            return query;
        }

        public static IQueryable<T> ApplyGlobalFilter<T>(IQueryable<T> query, DatatbleRequestColumn[] columns,
            DatatableRequestSearch search) where T : class
        {
            if ((columns == null) || (columns.Length == 0) || string.IsNullOrEmpty(search?.Value)) return query;
            var searchQuery = new QueryBuilder<T>();

            foreach (var column in columns)
                if (column.Searchable)
                    searchQuery.Or(column.Data, QueryableExtensions.QueryType.Contains, search.Value);
            var build = searchQuery.Build();
            if (build != null)
                query = query.Where(build);
            return query;
        }
    }
}