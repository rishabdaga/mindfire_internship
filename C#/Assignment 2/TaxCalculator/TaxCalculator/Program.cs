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
            ulong income, exemption;
            List<double> resultSet;
            Console.WriteLine("---------------------TAX CALCULATOR---------------------");
   restart: Console.WriteLine("ENTER YOUR TOTAL INCOME:");
            income = Calc.Validation(Console.ReadLine());
            Console.WriteLine("ENTER THE AMOUNT EXEMPTED UNDER 80C:");
            exemption = Calc.Validation(Console.ReadLine());
            if (exemption > income)
            {
                Console.WriteLine("EXEMPTION CANNOT BE GREATER THAN INCOME.");
                
                //goto restart, to retake the input.

                goto restart;  


            }
            resultSet = Calc.TaxSlabCalculation(income, exemption);
            Calc.Display(resultSet);
            Console.WriteLine("\nENTER ANY KEY TO EXIT");
            Console.ReadKey();
        } 
    }
}
