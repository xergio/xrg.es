<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\PregResponse;
use App\Resource\Flags;

/**
 * Handler form preg_split() function.
 * @see preg_split()
 */
class PregSplit extends PregFunction
{
    protected array $availableFlags = [Flags::PREG_SPLIT_NO_EMPTY, Flags::PREG_SPLIT_DELIM_CAPTURE, Flags::PREG_SPLIT_OFFSET_CAPTURE];

    public function exec(): PregResponse
    {
        $ret = preg_split($this->dto->pattern, $this->dto->subject, $this->dto->limit ?? -1, $this->flags);

        return new PregResponse(
               $ret,
               $this->syntax(),
            ...$this->result($ret)
        );
    }

    protected function syntax(): string
    {
        $method = $this->dto->method->value;
        $args = [$method .'("'. $this->dto->pattern.'"'];

        $args[] = $this->cropString($this->dto->subject);

        if (!\is_null($this->dto->limit)) {
            $args[] = $this->dto->limit;
        }

        if (\count($this->flagsStr)) {
            $args[] = (\is_null($this->dto->limit)? 'null, ': ''). implode(' | ', $this->flagsStr);
        }


        $code = implode(", ", $args). ");";

        return $this->syntaxCleanup($code);
    }
}