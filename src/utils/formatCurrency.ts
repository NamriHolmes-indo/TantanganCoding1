export const formatRupiah = (value: string) => {
    const numberString = value.replace(/[^0-9]/g, "")
    const rupiah = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return rupiah
}
