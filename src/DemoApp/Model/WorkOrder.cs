using System;
using System.Collections.Generic;

namespace DemoApp.Model
{
    public class WorkOrder
    {
        public int WorkOrderId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int OrderQty { get; set; }
        public short ScrappedQty { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime ModifiedDate { get; set; }

    }
}