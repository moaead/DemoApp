using System.Text.RegularExpressions;

namespace DemoApp.Extensions
{
    public static class StringExtensions
    {
        public static string FirstLetterToUpper(this string str)
        {
            if (str == null)
                return null;

            if (str.Length > 1)
                return char.ToUpper(str[0]) + str.Substring(1);

            return str.ToUpper();
        }

        public static string ToHumanReadable(this string str)
        {
            return Regex.Replace(str.FirstLetterToUpper(), "[a-z][A-Z]", m => $"{m.Value[0]} {char.ToUpper(m.Value[1])}");
        }
    }
}