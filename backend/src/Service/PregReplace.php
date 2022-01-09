<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\PregResponse;

/**
 * Handler form preg_replace() function.
 * @see preg_replace()
 */
class PregReplace extends PregFunction
{
    public function exec(): PregResponse
    {
        $ret = preg_replace($this->dto->pattern, $this->dto->replacement, $this->dto->subject, $this->dto->limit ?? -1);

        return new PregResponse(
               $ret,
               $this->syntax(),
            ...$this->result($ret)
        );
    }

    protected function syntax(): string
    {
        $args = [$this->dto->method->value .'("'. $this->dto->pattern.'"'];

        $args[] = $this->cropString($this->dto->replacement, longText: '$replacement');
        $args[] = $this->cropString($this->dto->subject);

        if (!\is_null($this->dto->limit)) {
            $args[] = $this->dto->limit;
        }

        $code = implode(", ", $args). ");";

        return $this->syntaxCleanup($code);
    }
}