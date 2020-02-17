using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaxCalculator.Infra
{
    public interface Infrastucture
    {
        bool IsValidNumber(string a); //to check a validity of number.
        ulong Validation(string a); //to return valid number.
        List<double> TaxSlabCalculation(ulong income, ulong exemption); //to calculate tax slab.
        void Display(List<double> taxSlabAmount); //to display the tax slab and total amount.
    }
}
