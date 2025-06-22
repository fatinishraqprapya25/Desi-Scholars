export default function CalculatorWrapper({ source }) {
    return <>
        <iframe className="w-[375px] h-[667px] overflow-hidden border border-gray-300 rounded-lg mx-auto" src={source} title="W3Schools Free Online Web Tutorials" height="700px"></iframe>
    </>
}