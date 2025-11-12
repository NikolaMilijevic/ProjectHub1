using Microsoft.AspNetCore.Mvc;
using ProjectHub.Core.Entities;
using ProjectHub.Services;
using ProjectHub.Shared.DTOs;

namespace ProjectHub.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly ClientService _clientService;

        public ClientsController(ClientService clientService)
        {
            _clientService = clientService;
        }

        //private ActionResult<T> Wrap<T>(T? entity) => entity == null ? NotFound() : Ok(entity);

        [HttpGet]
        public async Task<ActionResult<List<ClientDto>>> GetAllClients()
        {
           var clients = await _clientService.GetAllClientsAsync();
           return Ok(clients);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDto>> GetClientById(int id)
        {
            var client = await _clientService.GetClientByIdAsync(id);

            if(client == null)
            {
                return NotFound();
            }

            return Ok(client);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient(int id)
        {
            var deleted = await _clientService.DeleteClientByIdAsync(id);

            if(!deleted)
            {
                return NotFound("The user with given id does not exist!");
            }

            return Ok(deleted);
        }
    }
}
