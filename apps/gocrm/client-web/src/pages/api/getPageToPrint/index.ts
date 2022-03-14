import puppeteer from 'puppeteer'
import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(
      'http://localhost:3001/propostas/toPrint/8b939500-544b-4375-a958-6fd834e29887',
      {
        waitUntil: 'networkidle2'
      }
    )

    const pdf = await page.pdf({
      format: 'a4',
      scale: 0.75,
      printBackground: true
    })

    await browser.close()

    res.setHeader('Content-Type', 'application/pdf')

    return res.send(pdf)
  } catch (error) {
    return res.status(200).json(error)
  }
})

export default handler
