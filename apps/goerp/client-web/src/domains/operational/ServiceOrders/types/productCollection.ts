import { CollectionType } from "./collection"

export type ProductCollectionType = Omit<CollectionType, 'Type'> & {
  Identifier: string
  ItemId: string
  Retirado: string
}
