/* eslint-disable jsx-a11y/alt-text */
import { Box } from "@chakra-ui/react"
import Image, { type ImageProps } from "next/image"

const styles = {
  marginTop: "1.7em",
  marginBottom: "1.7em",
  borderRadius: "lg",
  boxShadow: "inset",
}

export const Img = (props: ImageProps) => {
  // Markdown image syntax carries no dimensions, and next/image throws on a
  // src without them. Those fall back to a plain responsive img.
  if (props.width == null || props.height == null) {
    const { src, alt, ...rest } = props

    return (
      <Box
        asChild
        css={{ ...styles, width: "100%", height: "auto" }}
      >
        <img
          {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
          src={typeof src === "string" ? src : undefined}
          alt={alt}
          loading="lazy"
        />
      </Box>
    )
  }

  return (
    <Box asChild css={styles}>
      <Image {...props} />
    </Box>
  )
}
