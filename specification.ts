export interface Invoice {
  id: string;
  isPaid: boolean;
  createdAt: Date;
  hasBeenSent: boolean;
}
export interface IInvoiceRepository {
  all(): Invoice[];
}

abstract class Filter<T> {
  abstract isSatisfiedBy(items: T[]): T[];

  and(other: Specification<T>): Specification<T> {
    return other;
  }

  andNot(other: Specification<T>): Specification<T> {
    return other;
  }
}

class InvoiceIsPaidSpecification extends Specification<Invoice> {
  isSatisfiedBy(items: Invoice[]): Invoice[] {
    return items.filter((item) => item.isPaid);
  }
}

class InvoiceIsRecentSpecification extends Specification<Invoice> {
  isSatisfiedBy(items: Invoice[]): Invoice[] {
    return items.filter((item) => item.createdAt > new Date());
  }
}

class InvoiceHasBeenSentSpecification extends Specification<Invoice> {
  isSatisfiedBy(items: Invoice[]): Invoice[] {
    return items.filter((item) => item.hasBeenSent);
  }
}

export class InvoicesSender {
  constructor(private readonly repository: IInvoiceRepository) {}
  send(): void {
    const invoices = this.repository.all();

    const paid = new InvoiceIsPaidSpecification();
    const recent = new InvoiceIsRecentSpecification();
    const hasBeenSent = new InvoiceHasBeenSentSpecification();

    const specification = paid.and(recent).andNot(hasBeenSent);

    for (const invoice of invoices) {
      if (specification.isSatisfiedBy(invoice)) {
        console.log(`Invoice <${invoice.id}> has been sent.`);
      }
    }
  }
}
