import { Tax, TaxRequest } from '../../../types/domain/tax'

export interface TaxService {
    createNewTax: (taxRequest: TaxRequest) => Promise<Tax>
}
