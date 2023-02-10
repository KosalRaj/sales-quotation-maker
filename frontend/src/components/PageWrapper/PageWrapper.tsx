import './PageWrapper.styles.scss'

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

const PageWrapper = ({ children }: Props) => {
  return (
    <div className="page-wrapper">
      {children}
    </div>
  )
}

export default PageWrapper