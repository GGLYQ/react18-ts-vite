import { ReactElement } from 'react'
import './index.scss'
interface iconProps {
  iconName: string
  customClassName?: string
  onIconClick?: () => void
}

function Icon(props: iconProps): ReactElement {
  const { iconName, customClassName, onIconClick } = props
  const handleIcon = () => onIconClick?.()
  return (
    <span className={customClassName}>
      <i className={`iconfont ${iconName}`} onClick={handleIcon}></i>
    </span>
  )
}
export default Icon
