type TitleWithSubTitleAtTheTopProps = {
  title: string
  subtitle: string
  classSubtitle?: string
  classTitle?: string
}

export function TitleWithSubTitleAtTheTop({
  title,
  subtitle,
  classSubtitle,
  classTitle
}: TitleWithSubTitleAtTheTopProps) {
  return (
    <div>
      <p className={`-mb-2 text-gray-500 text-tiny ${classSubtitle}`}>
        {subtitle}:
      </p>
      {/* // TODO: remover a classe text-lg */}
      <h1 className={`mb-1 text-lg dark:text-white ${classTitle}`}>{title}</h1>
    </div>
  )
}
