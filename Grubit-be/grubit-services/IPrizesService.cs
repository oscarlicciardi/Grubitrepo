
using grubit.common.Enums;
using grubit.dac.entities;

namespace grubit_services
{
    public interface IPrizesService
    {
        Task<Prize[]> GetPrizes(User user);
        CompanyFrequency CalculateFrequency(Company company);
        double CalculateRate(CompanyFrequency? companyFrequency);
        Task<Prize> UsePrizeAsync(Prize prize, User user);
        Prize UsePrize(Prize prize, User user);
    }
}
