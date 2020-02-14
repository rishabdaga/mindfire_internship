using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaxCalculator.Infra
{
    public interface Infrastucture
    {
        bool IsValidNumber(string a);
        long Validation(string a);
        void TaxSlabCalculation(long income, long exemption);
    }
}
