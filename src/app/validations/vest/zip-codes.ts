import { enforce, test } from 'vest';

export type Zipcode = {
  Note: string;
  Country: string;
  ISO: string;
  Format: string;
  Regex: string;
};

export const zipCodes: Zipcode[] = [
  {
    Note: 'Numbering follows the dispatch of postal trains from Copenhagen.[3] Also used by Greenland, e.g.: DK-3900 Nuuk.',
    Country: 'Denmark',
    ISO: 'DK',
    Format: 'NNNN',
    Regex: '^(?:[1-24-9]\\d{3}|3[0-8]\\d{2})$',
  },
  {
    Note: 'Postleitzahl (PLZ)',
    Country: 'Germany',
    ISO: 'DE',
    Format: 'NN',
    Regex: '^\\d{5}$',
  },
  {
    Note: 'Known as the postcode. The first letter(s) indicate the postal area, such as the town or part of London. Placed on a separate line below the city (or county, if used). The UK postcode is made up of two parts separated by a space. These are known as the outward postcode and the inward postcode. The outward postcode is always one of the following formats: AN, ANN, AAN, AANN, ANA, AANA, AAA. The inward postcode is always formatted as NAA. A valid inward postcode never contains the letters: C, I, K, M, O or V. The British Forces Post Office has a different system, but as of 2012 has also adopted UK-style postcodes that begin with "BF1" for electronic compatibility.',
    Country: 'United Kingdom',
    ISO: 'GB',
    Format: 'A(A)N(A/N)NAA (A[A]N[A/N] NAA)',
    Regex:
      '^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$',
  },
];

export const zipCodeValidation = (
  field: string,
  value: string,
  regex: string
) => {
  test(field, 'Zip code not valid', () => {
    console.log('field', field, value, regex);
    enforce(value).matches(regex);
  });
};
