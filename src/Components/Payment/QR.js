import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export const QR = ({ text }) => {
    const [src, setSrc] = useState('')
    useEffect(() => {
        QRCode.toDataURL('test thử').then(setSrc);
    }, [])
    return (
        <div>
            <img src={src} />
        </div>
    )
}
