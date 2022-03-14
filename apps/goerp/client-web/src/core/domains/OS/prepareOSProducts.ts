import type { ProposalProduct } from './gerarOSMudarVeiculo'

export function prepareOSProducts(
  PropostasProdutos: ProposalProduct[],
  layer: number,
  Ids: { OSUUID: string; comboUUID?: string; planoUUID?: string }
) {
  const products = []

  let extraProductData = {}

  // produto dentro de plano ou combo
  if (layer > 1) {
    extraProductData = {
      OrdemDeServico_Id: Ids.OSUUID
    }
  }

  // preparando produtos
  PropostasProdutos.map((product) => {
    const identifiers = product.Produto.Fornecedores[0].Itens.map((item) => {
      if (item.TipoDeItem_Id) {
        return item.Item_Id
      }
    })
    // verifica se é identificavel o produto e se for multiplica o registro de acordo com a quantidade
    if (
      identifiers.filter((identifier) => identifier !== undefined).length > 0
    ) {
      for (let index = 0; index < product.Quantidade; index++) {
        products.push({
          Produto_Id: product.Produto.Id,
          PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
          PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
          Quantidade: 1,
          ...extraProductData
        })
      }
      return
    }
    products.push({
      Produto_Id: product.Produto.Id,
      PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
      PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
      Quantidade: product.Quantidade,
      ...extraProductData
    })
  })

  const filteredProducts: {
    OrdemDeServico_Id: string
    Produto_Id: string
    PrecoDeAdesao_Id: string
    PrecoDeRecorrencia_Id: string
    Quantidade: number
  }[] = []

  // filtrando os produtos duplicados
  products.map((product) => {
    const duplicatedPosition = filteredProducts.findIndex(
      (filteredProduct) => product.Produto_Id === filteredProduct.Produto_Id
    )

    if (!(duplicatedPosition > -1)) {
      filteredProducts.push({
        OrdemDeServico_Id: product.OrdemDeServico_Id,
        Produto_Id: product.Produto_Id,
        PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
        PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
        Quantidade: product.Quantidade,
      })
    }
  })

  return products
}