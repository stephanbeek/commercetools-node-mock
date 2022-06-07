import {
  Customer,
  CustomerChangeEmailAction,
  CustomerDraft,
  ReferenceTypeId,
} from '@commercetools/platform-sdk'
import { Writable } from 'types'
import { getBaseResourceProperties } from '../helpers'
import { AbstractResourceRepository } from './abstract'

export class CustomerRepository extends AbstractResourceRepository {
  getTypeId(): ReferenceTypeId {
    return 'customer'
  }

  create(projectKey: string, draft: CustomerDraft): Customer {
    const resource: Customer = {
      ...getBaseResourceProperties(),
      email: draft.email,
      password: draft.password
        ? Buffer.from(draft.password).toString('base64')
        : undefined,
      isEmailVerified: draft.isEmailVerified || false,
      addresses: [],
    }
    this.save(projectKey, resource)
    return resource
  }

  getMe(projectKey: string): Customer | undefined {
    const results = this._storage.query(projectKey, this.getTypeId(), {}) // grab the first customer you can find
    if (results.count > 0) {
      return results.results[0] as Customer
    }

    return
  }

  actions = {
    changeEmail: (
      _projectKey: string,
      resource: Writable<Customer>,
      { email }: CustomerChangeEmailAction
    ) => {
      resource.email = email
    },
  }
}
