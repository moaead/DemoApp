namespace DemoApp.Datatables
{
    public class DatatableRequest
    {
        public int Draw { get; set; }
        public int Start { get; set; }
        public int Length { get; set; }
        public DatatableRequestSearch Search { get; set; }
        public DatatableRequestOrder[] Order { get; set; }
        public DatatbleRequestColumn[] Columns { get; set; }
    }

    public class DatatableRequestOrder
    {
        public int Column { get; set; }
        public DatatbleRequestDir Dir { get; set; }
    }

    public class DatatbleRequestColumn
    {
        public string Data { get; set; }
        public string Name { get; set; }
        public bool Searchable { get; set; }
        public bool Orderable { get; set; }
        public DatatableRequestSearch Search { get; set; }
    }

    public class DatatableRequestSearch
    {
        public string Value { get; set; }
        public bool Regex { get; set; }
    }

    public enum DatatbleRequestDir
    {
        Asc,
        Desc
    }
}