using System;

namespace NeverAlone.Data.Exceptions;

public class JwtTokenException : Exception
{
    public JwtTokenException(Exception ex) : base(ex.Message)
    {
    }

    public JwtTokenException(string message) : base(message)
    {
    }
}