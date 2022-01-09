<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\PregResponse;

/**
 * Handler form preg_quote() function.
 * @see preg_quote()
 */
class PregQuote extends PregFunction
{
    public function exec(): PregResponse
    {
        $ret = preg_quote($this->dto->pattern, $this->dto->delimiter);

        return new PregResponse(
               $ret,
               $this->syntax(),
            ...$this->result($ret)
        );
    }

    protected function syntax(): string
    {
        $args = [$this->dto->method->value .'("'. $this->dto->pattern.'"'];

        if (!\is_null($this->dto->delimiter) && $this->dto->delimiter !== '') {
            $args[] = $this->cropString($this->dto->delimiter);
        }

        $code = implode(", ", $args). ");";

        return $this->syntaxCleanup($code);
    }
}