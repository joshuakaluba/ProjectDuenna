using System;
using System.Linq;

namespace NeverAlone.Data.Utilities;

public static class StringUtilities
{
    public static string GenerateRandomString(int length)
    {
        var random = new Random();
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return new string(Enumerable.Repeat(chars, length)
            .Select(x => x[random.Next(x.Length)]).ToArray());
    }
}