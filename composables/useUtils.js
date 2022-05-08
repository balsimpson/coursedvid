const createSlug = (title, id) => {
  if (title && id) {
    return (
      title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-') +
      '-' +
      id
    )
  } else {
    console.log('no title or id', title, id)
  }
}

const getYtlinkId = (link) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = link.match(regExp)

    link = match && match[2].length === 11 ? match[2] : null
    
    return link;
  }

export { createSlug, getYtlinkId }
