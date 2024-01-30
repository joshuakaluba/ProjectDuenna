using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NeverAlone.Business.DTO;
using NeverAlone.Business.Services.Contacts;
using NeverAlone.Data.Models;
using NeverAlone.Web.Services.ApplicationUserManager;

namespace NeverAlone.Web.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public sealed class ContactsController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly ILogger<ContactsController> _logger;
    private readonly IApplicationUserManager _userManager;

    public ContactsController(IContactService contactService,
        ILogger<ContactsController> logger,
        IApplicationUserManager userManager)
    {
        _contactService = contactService;
        _userManager = userManager;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetContacts()
    {
        var user = await _userManager.GetCurrentAuthenticatedUserAsync();
        var contacts = await _contactService.GetContactsByUserAsync(user);
        return Ok(contacts);
    }

    [HttpPost]
    public async Task<IActionResult> CreateContact(List<ContactDto> contacts)
    {
        if (ModelState.IsValid)
        {
            var user = await _userManager.GetCurrentAuthenticatedUserAsync();
            var currentContacts = await _contactService.GetContactsByUserAsync(user);

            if (currentContacts != null && currentContacts.ToList().Count + contacts.Count > 3)
                return BadRequest(new ResponseMessage("You can not have more than 3 emergency contacts"));

            foreach (var contact in contacts)
            {
                contact.Id = Guid.NewGuid();
                contact.ApplicationUserId = user.Id;
                await _contactService.CreateContactAsync(contact);
            }

            return Ok(contacts);
        }

        return new JsonResult("Something went wrong") { StatusCode = 500 };
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateContact(string id, ContactDto contact)
    {
        var contactId = Guid.Parse(id);
        if (contactId != contact.Id)
            return BadRequest();

        var existingContact = await _contactService.GetContactByIdAsync(contactId);
        if (existingContact == null)
            return NotFound();

        existingContact.Email = contact.Email;
        existingContact.Name = contact.Name;
        existingContact.PhoneNumber = contact.PhoneNumber;

        await _contactService.UpdateContactAsync(existingContact);

        return Ok(existingContact);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContact(string id)
    {
        var user = await _userManager.GetCurrentAuthenticatedUserAsync();
        var existingContact = await _contactService.GetContactByIdAsync(Guid.Parse(id));

        if (existingContact == null) return NotFound();

        if (existingContact.ApplicationUserId != user.Id) return Forbid();

        await _contactService.DeleteContactAsync(existingContact);

        return Ok(existingContact);
    }
}