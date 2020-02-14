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
        public long Validation(string a)
        {
            while (!IsValidNumber(a))
            {
                a = Console.ReadLine();
            }
            return UInt32.Parse(a);
        }
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
        public void TaxSlabCalculation(long income, long exemption)
        {
            
                int i;
                double netTaxAmount = 0;
                double slabTaxAmount = 0;
                int[] slab = { 0, 250000, 500000, 1000000 };
                double[] slabRate = { 0, 0.05, 0.2, 0.3 };
                long taxableAmount = (exemption >= 150000) ? income - 150000 : income - exemption;
                Console.WriteLine("------------------------------------------------------------");
                Console.WriteLine("INCOME: {0}", income);
                Console.WriteLine("EXEMPTION: {0}", exemption);
                Console.WriteLine("TAXABLE AMOUNT:\t{0}\n", taxableAmount);
                Console.WriteLine("SLABS\t\t\t\tTAX AMOUNT\n");
                for (i = 0; i < slab.Length - 1 && taxableAmount > 0; i++)
                {
                    slabTaxAmount = slabRate[i] * (slab[i + 1] - slab[i]);
                    netTaxAmount += slabTaxAmount;
                    Console.WriteLine("Rs.{0} to Rs.{1}\t\tRs.{2}", slab[i], slab[i + 1], slabTaxAmount);
                    taxableAmount -= (slab[i + 1] - slab[i]);
                }
                if (taxableAmount > 0)
                {
                    slabTaxAmount = slabRate[i] * taxableAmount;
                    netTaxAmount += slabTaxAmount;
                    Console.WriteLine("Rs.{0} and Above\t\tRs.{1}", slab[i], slabTaxAmount);
                }
                string formattedPrice = netTaxAmount.ToString("0,0", CultureInfo.CreateSpecificCulture("hi-IN"));
                Console.Write("\nTotal Tax Amount: Rs.");
                Console.WriteLine(formattedPrice);
                Console.WriteLine("------------------------------------------------------------");
            
        }
    }
}
