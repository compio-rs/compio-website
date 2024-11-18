import cx from 'classix'

export default function Container({
  children,
  className,
  main,
  ...rest
}: React.HtmlHTMLAttributes<HTMLDivElement> & { main?: boolean }) {
  const isMain = main ?? true

  return (
    <div
      className={cx(
        'max-w-screen-2xl mx-auto py-4 px-8',
        isMain && 'pb-48',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
