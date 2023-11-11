using grubit.common.Dto;
using grubit.dac;
using grubit.dac.Dto;
using grubit.dac.entities;
using grubit_services;
using Microsoft.AspNetCore.Mvc;

namespace Grubit.api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PrizesController : ControllerBase
    {
        private readonly GrubitDbContext _context;
        private readonly IPrizesService _prizesService;

        public PrizesController(GrubitDbContext context, IPrizesService prizesService)
        {
            _context = context;
            _prizesService = prizesService;
        }

        [HttpGet]
        [Route("/prizes/list")]
        public async Task<ActionResult<PrizesDto[]>> GetPrizes()
        {
            Prize[] prizes = await _prizesService.GetPrizes();

            PrizesDto[] prizeDtos = prizes.Select(prize => new PrizesDto
            {
                Status = prize.Status,
                Name = prize.Name,
                Code = prize.Code,
                PointsNeeded = prize.PointRequired,
               
            }).ToArray();

            return Ok(prizeDtos);
        }

     /*   [Route("/prizes/use/{code}")]
        [HttpGet]
        public async Task<ActionResult<PrizesDto>> UsePrize([FromRoute] string code)
        {
            var p = _context.Prizes.
            var prize = _prizesService.UsePrize()
            var prizeDto = new PrizesDto
            {
                // Populate the PrizesDto properties based on your business logic
            };

            return Ok(prizeDto);
        }*/



    }
}
