using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaxCalculator.Infra;
using System.Collections;
using System.Globalization;

namespace TaxCalculator.Business
{
    public class TaxCalculations : Infrastucture
    {

        // to take input until valid input is provided

        public ulong Validation(string a)
        {
            while (!IsValidNumber(a))
            {
                a = Console.ReadLine();
            }
            return UInt64.Parse(a);
        }

        // to check a number is valid and return boolean value

        public bool IsValidNumber(string a)
        {
            try
            {
                UInt64.Parse(a);
                return true;
            }
            catch (Exception)
            {
                Console.WriteLine("Invalid Input");
                Console.WriteLine("RE-ENTER(accepts positive amount only)");
                return false;
            }

        }

        // return the list of slab tax amount

        public List<double> TaxSlabCalculation(ulong income, ulong exemption)
        {
            int i;
            List<double> slabTaxAmount = new List<double>();
            int[] slab = { 0, 250000, 500000, 1000000 };
            double[] slabRate = { 0, 0.05, 0.2, 0.3 };
            double taxableAmount = (exemption >= 150000) ? income - 150000 : income - exemption;
            double amountDeduct;
            Console.WriteLine("------------------------------------------------------------");
            Console.WriteLine("INCOME: {0}", income);
            Console.WriteLine("EXEMPTION: {0}", exemption);
            Console.WriteLine("TAXABLE AMOUNT AFTER EXEMPTION:\t{0}\n", taxableAmount);


            for (i = 0; i < slab.Length - 1 && taxableAmount > 0; i++)
            {
                amountDeduct = (taxableAmount <= slab[i]) ? taxableAmount : (slab[i + 1] - slab[i]);
                slabTaxAmount.Add(slabRate[i] * amountDeduct);
                taxableAmount -= amountDeduct;
            }
            if (taxableAmount > 0)
            {
                slabTaxAmount.Add(slabRate[i] * taxableAmount);
            }
            return slabTaxAmount;             
        }

        //formatting value in india format.

        public string FormattingIndian(double a)
        {
            return a.ToString("0,0", CultureInfo.CreateSpecificCulture("hi-IN"));
        }

        //displaying the tax

        public void Display(List<double> slabTaxAmount)
        {
            double netTaxAmount = 0;
            int j = 0;
            Console.WriteLine("SLABS                      \t\tTAX AMOUNT\n");
            string[] slab = { "Rs.0 To Rs.2,50,000        ", 
                              "Rs.2,50,000 To Rs.5,00,000 ", 
                              "Rs.5,00,000 To Rs.10,00,000", 
                              "Above Rs.10,00,000         " };
              
            foreach (double i in slabTaxAmount)
            {
                Console.WriteLine("{0}\t\tRs.{1}", slab[j], FormattingIndian(i));
                netTaxAmount += i;
                j++;
            }
            Console.Write("\nTotal Tax Amount:          \t\tRs.");
            Console.WriteLine(FormattingIndian(netTaxAmount));
            Console.WriteLine("------------------------------------------------------------");
        }
    }
}
