export const IframeComponent = ({ src }: { src: string }) => {
  return (
    <div>
      <iframe
        src={src || ''}
        title="firefighter"
        style={{ width: '100%', height: '408px' }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      ></iframe>
    </div>
  )
}
