type Props = {
  value: string
  handleClick: () => void
}
export const Square = ({ value, handleClick }: Props) => {
  return (
    <div
      className="w-10 h-10 border border-gray-900 cursor-pointer text-center font-bold leading-10"
      onClick={handleClick}
    >
      {value}
    </div>
  )
}
