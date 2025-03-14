import { createComponent } from "./create-component"

export const DataListAnatomy = createComponent((props) => {
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
        d="M229.714 187.507V184.019L239.989 167.785H242.898V172.751H241.125L234.208 183.711V183.901H248.55V187.507H229.714ZM241.266 192V186.443L241.314 184.882V167.785H245.452V192H241.266ZM261.435 192.461C259.488 192.461 257.817 191.968 256.422 190.983C255.034 189.99 253.966 188.559 253.217 186.691C252.477 184.815 252.106 182.557 252.106 179.916C252.114 177.275 252.488 175.029 253.229 173.176C253.978 171.316 255.046 169.897 256.434 168.92C257.829 167.942 259.496 167.454 261.435 167.454C263.374 167.454 265.041 167.942 266.437 168.92C267.832 169.897 268.9 171.316 269.641 173.176C270.39 175.037 270.764 177.283 270.764 179.916C270.764 182.565 270.39 184.827 269.641 186.703C268.9 188.571 267.832 189.998 266.437 190.983C265.049 191.968 263.382 192.461 261.435 192.461ZM261.435 188.76C262.949 188.76 264.143 188.015 265.018 186.526C265.901 185.028 266.342 182.825 266.342 179.916C266.342 177.993 266.141 176.377 265.739 175.068C265.337 173.76 264.769 172.774 264.036 172.112C263.303 171.442 262.436 171.107 261.435 171.107C259.93 171.107 258.739 171.856 257.864 173.354C256.989 174.843 256.548 177.031 256.54 179.916C256.532 181.847 256.725 183.471 257.119 184.787C257.521 186.104 258.089 187.097 258.822 187.767C259.555 188.429 260.426 188.76 261.435 188.76ZM278.713 186.301L278.701 181.134H279.387L285.914 173.838H290.915L282.887 182.777H282L278.713 186.301ZM274.811 192V167.785H279.091V192H274.811ZM286.209 192L280.297 183.735L283.182 180.72L291.329 192H286.209ZM300.918 199.189C299.381 199.189 298.061 198.98 296.957 198.562C295.854 198.152 294.967 197.601 294.297 196.907C293.627 196.213 293.162 195.445 292.902 194.601L296.756 193.667C296.93 194.022 297.182 194.373 297.513 194.72C297.844 195.074 298.289 195.366 298.849 195.594C299.416 195.831 300.13 195.949 300.989 195.949C302.203 195.949 303.208 195.654 304.004 195.062C304.8 194.479 305.198 193.517 305.198 192.177V188.737H304.986C304.765 189.178 304.442 189.631 304.016 190.096C303.598 190.561 303.042 190.952 302.349 191.267C301.663 191.582 300.8 191.74 299.759 191.74C298.364 191.74 297.099 191.413 295.964 190.758C294.837 190.096 293.938 189.111 293.268 187.803C292.606 186.486 292.275 184.839 292.275 182.86C292.275 180.866 292.606 179.183 293.268 177.811C293.938 176.432 294.841 175.387 295.976 174.678C297.111 173.961 298.376 173.602 299.771 173.602C300.835 173.602 301.71 173.783 302.396 174.146C303.09 174.501 303.642 174.93 304.051 175.435C304.461 175.931 304.773 176.4 304.986 176.842H305.222V173.838H309.443V192.296C309.443 193.848 309.073 195.133 308.332 196.15C307.591 197.167 306.578 197.928 305.293 198.432C304.008 198.937 302.55 199.189 300.918 199.189ZM300.954 188.382C301.86 188.382 302.633 188.161 303.271 187.72C303.91 187.278 304.394 186.644 304.725 185.816C305.057 184.988 305.222 183.995 305.222 182.836C305.222 181.693 305.057 180.692 304.725 179.833C304.402 178.974 303.921 178.308 303.283 177.835C302.652 177.354 301.876 177.114 300.954 177.114C300 177.114 299.204 177.362 298.565 177.859C297.927 178.355 297.446 179.037 297.123 179.904C296.799 180.763 296.638 181.741 296.638 182.836C296.638 183.948 296.799 184.921 297.123 185.757C297.454 186.585 297.939 187.231 298.577 187.696C299.223 188.153 300.016 188.382 300.954 188.382Z"
        fill={palette[3]}
      />
      <path
        d="M230.388 103.785H235.756L242.945 121.331H243.229L250.418 103.785H255.786V128H251.577V111.364H251.352L244.66 127.929H241.515L234.822 111.328H234.598V128H230.388V103.785ZM268.414 128.355C266.593 128.355 265.021 127.976 263.696 127.22C262.38 126.455 261.367 125.375 260.658 123.98C259.948 122.577 259.594 120.925 259.594 119.026C259.594 117.157 259.948 115.518 260.658 114.107C261.375 112.688 262.376 111.584 263.661 110.796C264.946 110 266.455 109.602 268.19 109.602C269.309 109.602 270.365 109.783 271.358 110.146C272.359 110.501 273.242 111.052 274.007 111.801C274.779 112.55 275.386 113.504 275.828 114.663C276.269 115.813 276.49 117.185 276.49 118.777V120.09H261.604V117.205H272.387C272.379 116.385 272.202 115.656 271.855 115.017C271.508 114.371 271.023 113.863 270.401 113.492C269.786 113.122 269.068 112.936 268.249 112.936C267.374 112.936 266.605 113.149 265.943 113.575C265.281 113.993 264.765 114.544 264.394 115.23C264.031 115.908 263.846 116.653 263.838 117.465V119.983C263.838 121.04 264.031 121.946 264.418 122.703C264.804 123.452 265.344 124.027 266.038 124.429C266.731 124.823 267.543 125.02 268.473 125.02C269.096 125.02 269.66 124.934 270.164 124.76C270.669 124.579 271.106 124.315 271.477 123.968C271.847 123.621 272.127 123.192 272.316 122.679L276.313 123.129C276.06 124.185 275.579 125.107 274.87 125.895C274.168 126.676 273.27 127.283 272.174 127.716C271.078 128.142 269.825 128.355 268.414 128.355ZM284.391 103.785V128H280.111V103.785H284.391Z"
        fill={palette[3]}
      />
      <path
        opacity={0.5}
        d="M100.548 174.441C100.438 173.409 99.973 172.605 99.1532 172.029C98.3413 171.454 97.2851 171.166 95.9844 171.166C95.07 171.166 94.2857 171.304 93.6315 171.58C92.9772 171.856 92.4767 172.23 92.1298 172.703C91.783 173.176 91.6056 173.716 91.5977 174.323C91.5977 174.828 91.712 175.265 91.9406 175.636C92.1771 176.006 92.4964 176.321 92.8984 176.582C93.3004 176.834 93.7458 177.047 94.2345 177.22C94.7232 177.394 95.2159 177.539 95.7125 177.658L97.9827 178.225C98.8971 178.438 99.776 178.726 100.619 179.088C101.471 179.451 102.231 179.908 102.901 180.46C103.579 181.012 104.115 181.678 104.509 182.458C104.904 183.238 105.101 184.153 105.101 185.201C105.101 186.62 104.738 187.87 104.013 188.949C103.288 190.021 102.239 190.861 100.868 191.468C99.504 192.067 97.8526 192.367 95.9135 192.367C94.0295 192.367 92.3939 192.075 91.0066 191.492C89.6271 190.908 88.5472 190.057 87.7668 188.938C86.9943 187.818 86.5765 186.455 86.5135 184.847H90.8292C90.8923 185.69 91.1524 186.392 91.6096 186.951C92.0668 187.511 92.6619 187.929 93.395 188.205C94.136 188.48 94.9636 188.618 95.878 188.618C96.8318 188.618 97.6674 188.476 98.3847 188.193C99.1099 187.901 99.6774 187.499 100.087 186.987C100.497 186.466 100.706 185.859 100.714 185.166C100.706 184.535 100.521 184.015 100.158 183.605C99.7957 183.187 99.2872 182.84 98.633 182.565C97.9866 182.281 97.2299 182.028 96.3628 181.808L93.6078 181.098C91.6135 180.586 90.037 179.81 88.8782 178.769C87.7274 177.721 87.152 176.329 87.152 174.595C87.152 173.168 87.5382 171.919 88.3107 170.847C89.0911 169.775 90.1513 168.943 91.4913 168.352C92.8314 167.753 94.3488 167.454 96.0435 167.454C97.762 167.454 99.2675 167.753 100.56 168.352C101.861 168.943 102.882 169.767 103.623 170.823C104.364 171.872 104.746 173.078 104.77 174.441H100.548ZM108.822 192V173.838H113.103V192H108.822ZM110.974 171.261C110.296 171.261 109.713 171.036 109.224 170.587C108.736 170.13 108.491 169.582 108.491 168.943C108.491 168.297 108.736 167.749 109.224 167.3C109.713 166.843 110.296 166.614 110.974 166.614C111.66 166.614 112.243 166.843 112.724 167.3C113.213 167.749 113.457 168.297 113.457 168.943C113.457 169.582 113.213 170.13 112.724 170.587C112.243 171.036 111.66 171.261 110.974 171.261ZM117.267 192V189.28L126.632 177.539V177.386H117.575V173.838H131.87V176.759L122.955 188.299V188.453H132.177V192H117.267ZM143.721 192.355C141.9 192.355 140.327 191.976 139.003 191.22C137.686 190.455 136.673 189.375 135.964 187.98C135.255 186.577 134.9 184.925 134.9 183.026C134.9 181.157 135.255 179.518 135.964 178.107C136.681 176.688 137.682 175.584 138.967 174.796C140.252 174 141.762 173.602 143.496 173.602C144.615 173.602 145.672 173.783 146.665 174.146C147.666 174.501 148.549 175.052 149.313 175.801C150.086 176.55 150.693 177.504 151.134 178.663C151.576 179.813 151.796 181.185 151.796 182.777V184.09H136.91V181.205H147.693C147.686 180.385 147.508 179.656 147.161 179.017C146.814 178.371 146.33 177.863 145.707 177.492C145.092 177.122 144.375 176.936 143.555 176.936C142.68 176.936 141.911 177.149 141.249 177.575C140.587 177.993 140.071 178.544 139.7 179.23C139.338 179.908 139.153 180.653 139.145 181.465V183.983C139.145 185.04 139.338 185.946 139.724 186.703C140.11 187.452 140.65 188.027 141.344 188.429C142.038 188.823 142.85 189.02 143.78 189.02C144.402 189.02 144.966 188.934 145.47 188.76C145.975 188.579 146.412 188.315 146.783 187.968C147.153 187.621 147.433 187.192 147.622 186.679L151.619 187.129C151.367 188.185 150.886 189.107 150.176 189.895C149.475 190.676 148.576 191.283 147.481 191.716C146.385 192.142 145.132 192.355 143.721 192.355Z"
        fill={palette[3]}
      />
      <path
        opacity={0.5}
        d="M107.288 103.785V128H103.386L91.9761 111.506H91.7751V128H87.3884V103.785H91.314L102.712 120.291H102.925V103.785H107.288ZM117.105 128.367C115.954 128.367 114.917 128.162 113.995 127.752C113.081 127.334 112.356 126.719 111.82 125.907C111.291 125.095 111.027 124.094 111.027 122.904C111.027 121.879 111.217 121.032 111.595 120.362C111.973 119.692 112.49 119.156 113.144 118.754C113.798 118.352 114.535 118.048 115.355 117.843C116.183 117.63 117.038 117.477 117.921 117.382C118.985 117.272 119.848 117.173 120.51 117.087C121.172 116.992 121.653 116.85 121.953 116.661C122.26 116.464 122.414 116.16 122.414 115.75V115.679C122.414 114.789 122.15 114.099 121.622 113.61C121.094 113.122 120.333 112.877 119.34 112.877C118.291 112.877 117.46 113.106 116.845 113.563C116.238 114.02 115.828 114.56 115.615 115.183L111.619 114.615C111.934 113.512 112.454 112.589 113.179 111.849C113.905 111.1 114.791 110.54 115.84 110.17C116.888 109.791 118.047 109.602 119.316 109.602C120.191 109.602 121.062 109.704 121.929 109.909C122.796 110.114 123.588 110.453 124.306 110.926C125.023 111.391 125.598 112.026 126.032 112.83C126.473 113.634 126.694 114.639 126.694 115.845V128H122.579V125.505H122.437C122.177 126.01 121.811 126.483 121.338 126.924C120.873 127.358 120.286 127.708 119.576 127.976C118.875 128.236 118.051 128.367 117.105 128.367ZM118.216 125.221C119.076 125.221 119.82 125.052 120.451 124.713C121.082 124.366 121.566 123.909 121.905 123.341C122.252 122.774 122.426 122.155 122.426 121.485V119.345C122.292 119.455 122.063 119.558 121.74 119.652C121.425 119.747 121.07 119.83 120.676 119.901C120.282 119.972 119.891 120.035 119.505 120.09C119.119 120.145 118.784 120.192 118.5 120.232C117.862 120.318 117.29 120.46 116.786 120.657C116.281 120.854 115.883 121.13 115.591 121.485C115.3 121.832 115.154 122.281 115.154 122.833C115.154 123.621 115.442 124.216 116.017 124.618C116.593 125.02 117.326 125.221 118.216 125.221ZM130.998 128V109.838H135.089V112.924H135.302C135.68 111.884 136.307 111.072 137.182 110.489C138.057 109.898 139.101 109.602 140.315 109.602C141.545 109.602 142.582 109.902 143.425 110.501C144.276 111.092 144.875 111.9 145.222 112.924H145.411C145.813 111.916 146.491 111.111 147.445 110.512C148.407 109.905 149.546 109.602 150.862 109.602C152.533 109.602 153.897 110.13 154.953 111.186C156.01 112.243 156.538 113.784 156.538 115.81V128H152.246V116.472C152.246 115.344 151.946 114.521 151.347 114C150.748 113.472 150.015 113.208 149.148 113.208C148.115 113.208 147.307 113.531 146.724 114.178C146.148 114.816 145.861 115.648 145.861 116.673V128H141.663V116.294C141.663 115.356 141.379 114.607 140.812 114.048C140.252 113.488 139.519 113.208 138.613 113.208C137.998 113.208 137.438 113.366 136.934 113.681C136.429 113.989 136.027 114.426 135.728 114.994C135.428 115.553 135.278 116.208 135.278 116.956V128H130.998ZM168.92 128.355C167.099 128.355 165.527 127.976 164.203 127.22C162.886 126.455 161.873 125.375 161.164 123.98C160.454 122.577 160.1 120.925 160.1 119.026C160.1 117.157 160.454 115.518 161.164 114.107C161.881 112.688 162.882 111.584 164.167 110.796C165.452 110 166.961 109.602 168.696 109.602C169.815 109.602 170.871 109.783 171.864 110.146C172.866 110.501 173.748 111.052 174.513 111.801C175.285 112.55 175.892 113.504 176.334 114.663C176.775 115.813 176.996 117.185 176.996 118.777V120.09H162.11V117.205H172.893C172.885 116.385 172.708 115.656 172.361 115.017C172.014 114.371 171.529 113.863 170.907 113.492C170.292 113.122 169.575 112.936 168.755 112.936C167.88 112.936 167.111 113.149 166.449 113.575C165.787 113.993 165.271 114.544 164.9 115.23C164.538 115.908 164.352 116.653 164.344 117.465V119.983C164.344 121.04 164.538 121.946 164.924 122.703C165.31 123.452 165.85 124.027 166.544 124.429C167.237 124.823 168.049 125.02 168.979 125.02C169.602 125.02 170.166 124.934 170.67 124.76C171.175 124.579 171.612 124.315 171.983 123.968C172.353 123.621 172.633 123.192 172.822 122.679L176.819 123.129C176.566 124.185 176.086 125.107 175.376 125.895C174.675 126.676 173.776 127.283 172.68 127.716C171.585 128.142 170.331 128.355 168.92 128.355Z"
        fill={palette[3]}
      />
    </svg>
  )
})
