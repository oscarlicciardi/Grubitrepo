using grubit.common.Enums;
using grubit.dac;
using grubit.dac.entities;
using System.Linq;

namespace grubit_services
{
    public class PrizesService : IPrizesService
    {
        private readonly GrubitDbContext _context;

        public PrizesService(GrubitDbContext context)
        {
            _context = context;
        }
        public CompanyFrequency CalculateFrequency(Company company)
        {
            var frequencies = _context.Frequencies.Where(f => f.CompanyId == company.Id).ToArray();
            if(frequencies.Length >= 20)
            {
                return CompanyFrequency.High;
            } else if (frequencies.Length <= 2)
            {
                return CompanyFrequency.Low;
            }
            else { return CompanyFrequency.Medium; }
        }

        public double CalculateRate(CompanyFrequency? companyFrequency)
        {
            switch (companyFrequency)
            {
                case CompanyFrequency.High:
                    return 0.5;
                case CompanyFrequency.Medium:
                    return 1.5;
                case CompanyFrequency.Low:
                    return 3;
                default:
                    return 0;
            }
        }

        public Task<Prize[]> GetPrizes()
        {
            var user = _context.Users.Single();
            var prizes = _context.Prizes.Where(p => p.UserId == user.Id).ToArray();

            return Task.FromResult(prizes);
        }

        public async Task<Prize> UsePrizeAsync (Prize prize, User user)
        {
            try
            {
                return UsePrize(prize, user);
            } catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public Prize UsePrize (Prize prize, User user)
        {

            if (user.TotalPoints >= prize.PointRequired && prize.Status == PrizesStatus.NotAvailable)
            {
                prize.Status = PrizesStatus.Available;
                user.TotalPoints = (int)(user.TotalPoints - prize.PointRequired);
                return prize;
            }else
            {
                return prize;
            }
        }
        
    }
}
