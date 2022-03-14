import type { ProposalService } from './gerarOSMudarVeiculo'

export function prepareOSServices(
  PropostasServicos: ProposalService[],
  layer: number,
  Ids: { OSUUID: string; comboUUID?: string; planoUUID?: string }
) {
  let extraServiceData: {
    OrdemDeServico_Id?: string
  } = {}

  // serviço dentro de combo ou plano
  if (layer > 1) {
    extraServiceData = {
      OrdemDeServico_Id: Ids.OSUUID
    }
  }

  const installationServices = PropostasServicos.map((service) => {
    return {
      Servico_Id: service.Servico.Id,
      PrecoDeAdesao_Id: service.PrecoDeAdesao?.Id,
      PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia?.Id,
      Beneficio: !service.Servico.GeraOS,
      ...extraServiceData
    }
  })

  const filteredServices: {
    OrdemDeServico_Id: string
    Servico_Id: string
    PrecoDeAdesao_Id: string
    PrecoDeRecorrencia_Id: string
    Beneficio: boolean
  }[] = []

  installationServices.map((service) => {
    const duplicatedPosition = filteredServices.findIndex(
      (filteredService) => service.Servico_Id === filteredService.Servico_Id
    )

    if (!(duplicatedPosition > -1)) {
      filteredServices.push({
        OrdemDeServico_Id: service.OrdemDeServico_Id,
        Servico_Id: service.Servico_Id,
        PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
        PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
        Beneficio: service.Beneficio
      })
    }
  })

  return filteredServices
}