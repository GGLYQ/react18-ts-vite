import { ReactElement, useMemo } from 'react'

interface iconProps {
  name: string
  size?: string
  color?: string
  prefix?: string
}

function SvgIcon(props: iconProps): ReactElement {
  const { name, size, color, prefix } = props
  const symbolId = useMemo(() => `#${prefix}-${name}`, [prefix, name])
  return (
    <svg aria-hidden='true' className='svg-icon' width={size} height={size}>
      <use xlinkHref={symbolId} fill={color} />
    </svg>
  )
}
SvgIcon.defaultProps = {
  color: '#333',
  size: '1rem',
  prefix: 'svgicon',
}
export default SvgIcon
