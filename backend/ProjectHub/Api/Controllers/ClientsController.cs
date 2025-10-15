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

        private ActionResult<T> Wrap<T>(T? entity) => entity == null ? NotFound() : Ok(entity);

        [HttpGet]
        public async Task<ActionResult<List<ClientDto>>> GetAllClients()
        {
            return Ok(await _clientService.GetAllClientsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDto>> GetClientById(int id)
        {
            return Wrap(await _clientService.GetClientByIdAsync(id));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient(int id)
        {
            return await _clientService.DeleteClientByIdAsync(id) ? NoContent() : NotFound();
        }
    }
}
