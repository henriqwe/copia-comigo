import { CollectionType } from './collection'

export type ProductCollectionType = Omit<
  CollectionType,
  'Type' | 'ChildrenIds'
> & {
  Identifier: string
  ItemId: string
  Retirado: string
  Amount: number
}
