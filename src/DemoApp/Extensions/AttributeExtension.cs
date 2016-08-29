using System.Linq;
using System.Reflection;

namespace DemoApp.Extensions
{
    public static class AttributeExtension
    {
        public static bool HasAttribute<T>(this PropertyInfo target)
        {
            var attribs = target.GetCustomAttributes(typeof(T), false);
            return attribs.Any();
        }
    }
}