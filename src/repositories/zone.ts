import {
  ReferenceTypeId,
  Zone,
  ZoneChangeNameAction,
  ZoneDraft,
  ZoneSetDescriptionAction,
  ZoneSetKeyAction,
  ZoneUpdateAction,
} from '@commercetools/platform-sdk'
import { Writable } from 'types'
import { getBaseResourceProperties } from '../helpers'
import { AbstractResourceRepository } from './abstract'

export class ZoneRepository extends AbstractResourceRepository {
  getTypeId(): ReferenceTypeId {
    return 'zone'
  }

  create(projectKey: string, draft: ZoneDraft): Zone {
    const resource: Zone = {
      ...getBaseResourceProperties(),
      key: draft.key,
      locations: draft.locations || [],
      name: draft.name,
      description: draft.description,
    }
    this.save(projectKey, resource)
    return resource
  }

  actions: Partial<
    Record<
      ZoneUpdateAction['action'],
      (projectKey: string, resource: Writable<Zone>, action: any) => void
    >
  > = {
    changeName: (
      projectKey: string,
      resource: Writable<Zone>,
      { name }: ZoneChangeNameAction
    ) => {
      resource.name = name
    },
    setDescription: (
      projectKey: string,
      resource: Writable<Zone>,
      { description }: ZoneSetDescriptionAction
    ) => {
      resource.description = description
    },
    setKey: (
      projectKey: string,
      resource: Writable<Zone>,
      { key }: ZoneSetKeyAction
    ) => {
      resource.key = key
    },
  }
}