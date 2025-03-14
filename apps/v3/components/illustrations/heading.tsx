import { createComponent } from "./create-component"

export const HeadingAnatomy = createComponent((props) => {
  const { palette, ...rest } = props
  return (
    <svg
      width={400}
      height={300}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M163.394 161V117.412H171.29V135.865H191.487V117.412H199.405V161H191.487V142.484H171.29V161H163.394ZM228.258 117.412V161H220.362V125.095H220.107L209.912 131.608V124.372L220.745 117.412H228.258Z"
        fill={palette[3]}
      />
      <path
        opacity={0.5}
        d="M183.279 71V51.8727H186.744V59.9701H195.607V51.8727H199.081V71H195.607V62.8746H186.744V71H183.279ZM203.307 71V68.497L209.948 61.9874C210.583 61.3461 211.112 60.7764 211.535 60.2783C211.959 59.7802 212.276 59.2976 212.488 58.8306C212.7 58.3637 212.806 57.8656 212.806 57.3363C212.806 56.7324 212.669 56.2156 212.395 55.786C212.121 55.3501 211.744 55.0139 211.265 54.7773C210.785 54.5407 210.24 54.4224 209.63 54.4224C209.001 54.4224 208.45 54.5532 207.977 54.8147C207.504 55.0699 207.137 55.4342 206.875 55.9074C206.62 56.3806 206.492 56.9441 206.492 57.5978H203.195C203.195 56.3837 203.472 55.3283 204.026 54.4317C204.581 53.5352 205.343 52.8409 206.315 52.349C207.292 51.8572 208.413 51.6112 209.677 51.6112C210.96 51.6112 212.086 51.8509 213.058 52.3304C214.029 52.8098 214.782 53.4667 215.318 54.301C215.86 55.1353 216.13 56.0879 216.13 57.1589C216.13 57.8749 215.993 58.5785 215.72 59.2696C215.446 59.9607 214.963 60.7266 214.272 61.5671C213.587 62.4077 212.625 63.4257 211.386 64.6211L208.089 67.974V68.1048H216.42V71H203.307Z"
        fill={palette[3]}
      />
      <path
        opacity={0.5}
        d="M183.279 229V209.873H186.744V217.97H195.607V209.873H199.081V229H195.607V220.875H186.744V229H183.279ZM209.78 229.262C208.435 229.262 207.239 229.031 206.193 228.57C205.153 228.11 204.332 227.468 203.728 226.646C203.124 225.825 202.803 224.875 202.766 223.798H206.277C206.308 224.315 206.48 224.766 206.791 225.152C207.102 225.532 207.516 225.828 208.033 226.039C208.55 226.251 209.129 226.357 209.77 226.357C210.455 226.357 211.062 226.239 211.591 226.002C212.121 225.759 212.535 225.423 212.834 224.993C213.132 224.564 213.279 224.069 213.273 223.508C213.279 222.929 213.129 222.419 212.824 221.977C212.519 221.535 212.077 221.189 211.498 220.94C210.925 220.691 210.234 220.566 209.425 220.566H207.734V217.895H209.425C210.091 217.895 210.673 217.78 211.171 217.55C211.676 217.319 212.071 216.996 212.357 216.578C212.644 216.155 212.784 215.666 212.778 215.112C212.784 214.57 212.662 214.1 212.413 213.702C212.171 213.297 211.825 212.983 211.377 212.759C210.935 212.534 210.415 212.422 209.817 212.422C209.232 212.422 208.69 212.528 208.192 212.74C207.694 212.952 207.292 213.254 206.987 213.646C206.682 214.032 206.52 214.493 206.501 215.028H203.167C203.192 213.957 203.5 213.017 204.092 212.208C204.69 211.392 205.487 210.757 206.483 210.302C207.479 209.842 208.597 209.611 209.836 209.611C211.112 209.611 212.22 209.851 213.161 210.33C214.107 210.804 214.839 211.442 215.355 212.245C215.872 213.048 216.13 213.935 216.13 214.907C216.137 215.984 215.819 216.887 215.178 217.615C214.543 218.344 213.708 218.82 212.675 219.044V219.194C214.02 219.38 215.05 219.878 215.766 220.688C216.488 221.491 216.846 222.49 216.84 223.686C216.84 224.757 216.535 225.716 215.925 226.562C215.321 227.403 214.487 228.063 213.422 228.542C212.364 229.022 211.149 229.262 209.78 229.262Z"
        fill={palette[3]}
      />
    </svg>
  )
})
