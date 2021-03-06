import * as common from '@comigo/ui-common'
// import * as blocks from '@/blocos'

import * as client from '&crm/domains/clients'
import * as document from '&crm/domains/clients/components/Tabs/Documents'
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'

type DocumentsProps = {
  Id?: string
  path?: string
}

type DocumentsTypeProps = DocumentsProps & {
  loading: boolean
  getId: (
    Name: string,
    ClientId: string
  ) => Promise<
    {
      Id: string
    }[]
  >
  approveDocument: (
    options?: MutationFunctionOptions<
      any,
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  declineDocument: (
    options?: MutationFunctionOptions<
      any,
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  refetch: () => void
}

export function Documents({ Id, path = 'client' }: DocumentsProps) {
  const { clientData } = client.useUpdate()
  const {
    getDocumentByNameAndClientId,
    approveDocument,
    declineDocument,
    declineDocumentLoading,
    documentsRefetch
  } = document.useDocument()

  return clientData?.Pessoa.PessoaJuridica ? (
    <LegalPersonDocuments
      Id={Id || clientData.Pessoa.Id}
      getId={getDocumentByNameAndClientId}
      approveDocument={approveDocument}
      declineDocument={declineDocument}
      loading={declineDocumentLoading}
      path={path}
      refetch={documentsRefetch}
    />
  ) : (
    <PhysicalPersonDocuments
      Id={(Id as string) || (clientData?.Pessoa.Id as string)}
      getId={getDocumentByNameAndClientId}
      approveDocument={approveDocument}
      declineDocument={declineDocument}
      loading={declineDocumentLoading}
      path={path}
      refetch={documentsRefetch}
    />
  )
}

function LegalPersonDocuments({
  Id,
  getId,
  approveDocument,
  declineDocument,
  loading,
  path,
  refetch
}: DocumentsTypeProps) {
  return (
    <>
      {/* <div className="flex justify-end w-full mt-5">A????es</div> */}
      <common.Separator />
      <div className="flex flex-col gap-2 ">
        <common.GenericTitle
          title="Cart??o CNPJ"
          subtitle="Anexe um documento v??lido"
        />
        <common.UploadFile
          documentName="CNPJ"
          Id={Id as string}
          getId={getId}
          approveDocument={approveDocument}
          declineDocument={declineDocument}
          loading={loading}
          path={path as string}
          refetch={refetch}
        />
      </div>
      <common.Separator className="mt-4" />
      <div className="flex flex-col gap-2 ">
        <common.GenericTitle
          title="Comprovante de endere??o"
          subtitle="Anexe um documento v??lido"
        />
        <common.UploadFile
          documentName="ENDERECO"
          Id={Id as string}
          getId={getId}
          approveDocument={approveDocument}
          declineDocument={declineDocument}
          loading={loading}
          path={path as string}
          refetch={refetch}
        />
      </div>
      <common.Separator className="mt-4" />
      <div className="flex flex-col gap-2 ">
        <common.GenericTitle
          title="Contrato Social"
          subtitle="Anexe um documento v??lido"
        />
        <common.UploadFile
          documentName="CONTRATO_SOCIAL"
          Id={Id as string}
          getId={getId}
          approveDocument={approveDocument}
          declineDocument={declineDocument}
          loading={loading}
          path={path as string}
          refetch={refetch}
        />
      </div>
    </>
  )
}

function PhysicalPersonDocuments({
  Id,
  getId,
  approveDocument,
  declineDocument,
  loading,
  path,
  refetch
}: DocumentsTypeProps) {
  return (
    <>
      {/* <div className="flex justify-end w-full mt-5">A????es</div> */}
      <common.Separator />
      <div className="flex flex-col gap-2 ">
        <common.GenericTitle
          title="Documento de identidade"
          subtitle="Anexe um documento v??lido"
        />
        <common.UploadFile
          documentName="IDENTIDADE"
          Id={Id as string}
          getId={getId}
          approveDocument={approveDocument}
          declineDocument={declineDocument}
          loading={loading}
          path={path as string}
          refetch={refetch}
        />
      </div>
      <common.Separator className="mt-4" />
      <div className="flex flex-col gap-2 ">
        <common.GenericTitle title="CNH" subtitle="Anexe um documento v??lido" />
        <common.UploadFile
          documentName="CNH"
          Id={Id as string}
          getId={getId}
          approveDocument={approveDocument}
          declineDocument={declineDocument}
          loading={loading}
          path={path as string}
          refetch={refetch}
        />
      </div>
      <common.Separator className="mt-4" />
      <div className="flex flex-col gap-2 ">
        <common.GenericTitle
          title="Endere??o"
          subtitle="Anexe um documento v??lido"
        />
        <common.UploadFile
          documentName="ENDERECO"
          Id={Id as string}
          getId={getId}
          approveDocument={approveDocument}
          declineDocument={declineDocument}
          loading={loading}
          path={path as string}
          refetch={refetch}
        />
      </div>
    </>
  )
}
