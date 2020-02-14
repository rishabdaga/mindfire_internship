using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaxCalculator.Business;

namespace TaxCalculator
{
    class Program 
    {
        static void Main(string[] args)
        {
            TaxCalculations Calc = new TaxCalculations();
            long income, exemption;
            Console.WriteLine("---------------------TAX CALCULATOR---------------------");
   restart: Console.WriteLine("ENTER YOUR TOTAL INCOME:");
            income = Calc.Validation(Console.ReadLine());
            Console.WriteLine("ENTER THE AMOUNT EXEMPTED UNDER 80C:");
            exemption = Calc.Validation(Console.ReadLine());
            if (exemption > income)
            {
                Console.WriteLine("EXEMPTION CANNOT BE GREATER THAN INCOME.");
                goto restart;
            }
            Calc.TaxSlabCalculation(income, exemption);
            Console.WriteLine("\nENTER ANY KEY TO EXIT");
            Console.ReadKey();
        } 
    }
}
