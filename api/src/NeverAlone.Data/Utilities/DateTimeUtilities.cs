using System;

namespace NeverAlone.Data.Utilities;

public static class DateTimeUtilities
{
    public static DateTime UnixTimeStampToDateTime(long unixTimeStamp)
    {
        var dateTimeVal = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
        dateTimeVal = dateTimeVal.AddSeconds(unixTimeStamp).ToLocalTime();
        return dateTimeVal;
    }
}