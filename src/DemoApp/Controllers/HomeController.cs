using System;
using System.Linq;
using DemoApp.Data;
using DemoApp.Datatables;
using DemoApp.Extensions;
using DemoApp.Model;
using DemoApp.RequestModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DemoApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("/WorkOrders")]
        public object GetWorkorders(DatatableRequest request)
        {
            return _context.WorkOrders.Include(t => t.Product).ApplyDatatables(request);
        }

        [HttpPost("/WorkOrders/Save")]
        public void SaveWorkOrder([FromBody] AddWorkOrderRequest request)
        {
            _context.WorkOrders.Add(new WorkOrder
            {
                ProductId = request.ProductId,
                OrderQty = request.OrderQty,
                StartDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                DueDate = DateTime.UtcNow
            });

            _context.SaveChanges();
        }

        [HttpGet("/Products/Dropdown")]
        public object GetProductsDropdown(DatatableRequest request)
        {
            return _context.Products.Select(t => new
            {
                Value = t.ProductId,
                Text = t.Name
            });
        }
    }
}