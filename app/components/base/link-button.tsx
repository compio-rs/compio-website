import cx from 'classix'
import { Link } from 'react-router'

interface LinkButtonProps extends React.RefAttributes<HTMLAnchorElement> {
  to: string
  children: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  className?: string
}

export default function LinkButton({
  to,
  left,
  right,
  children,
  className,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      className={cx(
        'px-6 py-3 rounded-full flex items-center gap-2',
        className,
      )}
      to={to}
      {...rest}
    >
      {left}
      {children}
      {right}
    </Link>
  )
}
