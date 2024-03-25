using Microsoft.AspNetCore.Mvc;

namespace NeverAlone.Web.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return Content("<p>Is Alive</p>", "text/html");
    }
}