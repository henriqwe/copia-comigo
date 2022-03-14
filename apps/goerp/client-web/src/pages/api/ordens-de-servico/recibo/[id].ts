import puppeteer from 'puppeteer'
import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/operacional/ordens-de-servico/recibo/${req.query.id}`,
      {
        waitUntil: 'networkidle2'
      }
    )

    const pdf = await page.pdf({
      format: 'a4',
      printBackground: true,
      margin: { left: '1cm', top: '2cm', right: '1cm', bottom: '2cm' }
    })

    await browser.close()

    res.setHeader('Content-Type', 'application/pdf')

    return res.send(pdf)
  } catch (error) {
    return res.status(200).json(error)
  }
})

export default handler
