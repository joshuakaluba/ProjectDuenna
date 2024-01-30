namespace NeverAlone.Business.Exceptions;

public class MultipleActiveMonitorsException : Exception
{
    public MultipleActiveMonitorsException(string message) : base(message)
    {
    }
}